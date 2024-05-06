import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { EcranAccueilService } from './ecran-accueil.service';
import { EcranAccueil } from './ecran-accueil.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEcranAccueilDto } from './CreateEcranAccueilDto';
import { UpdateEcranAccueilDto } from './UpdateEcranAccueilDto';

const storage = diskStorage({
  destination: './uploads', // le dossier où les fichiers sont stockés
  filename: (req, file, cb) => {
    // Obtenir le nom du fichier sans extension et le nettoyer
    const baseName = extname(file.originalname); // Declare the 'baseName' variable before using it
    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, ''); // Nettoyage pour éviter des caractères spéciaux
    const extension = extname(file.originalname); // obtenir l'extension
    cb(null, `${cleanBaseName}${extension}`); // utiliser le nom nettoyé avec son extension
  },
});

@Controller('ecran-accueil')
export class EcranAccueilController {
  constructor(private readonly ecranAccueilService: EcranAccueilService) {}

  @Get(':id')
  async getEcranAccueil(@Param('id') id: number): Promise<EcranAccueil> {
    const ecran = await this.ecranAccueilService.getEcranAccueil(id);
    if (!ecran) {
      throw new Error('Écran non trouvé');
    }
    return ecran;
  }

  @Get()
  async getAllEcranAccueil(): Promise<EcranAccueil[]> {
    return await this.ecranAccueilService.getAllEcranAccueil();
  }

  @Post('create')
  async createEcranAccueil(
    @Body() data: CreateEcranAccueilDto, // Use a DTO for input validation
  ): Promise<EcranAccueil> {
    return this.ecranAccueilService.createEcranAccueil(data);
  }
  @Put(':id') // Ajout de PUT
  async replaceEcranAccueil(
    @Param('id') id: number,
    @Body() newData: UpdateEcranAccueilDto, // Données complètes pour remplacement
  ): Promise<EcranAccueil> {
    const ecran = await this.ecranAccueilService.getEcranAccueil(id);

    if (!ecran) {
      throw new BadRequestException(`Écran avec l'ID ${id} non trouvé`);
    }

    return this.ecranAccueilService.replaceEcranAccueil(id, newData);
  }

  @Patch(':id')
  async updateEcranAccueil(
    @Param('id') id: number,
    @Body() updates: Partial<EcranAccueil>,
  ): Promise<EcranAccueil> {
    const ecran = await this.ecranAccueilService.getEcranAccueil(id);

    if (!ecran) {
      throw new Error('Écran non trouvé');
    }

    // Mise à jour des champs d'image et de vidéo : un seul peut être mis à jour à la fois
    if (updates.uploadedImage) {
      updates.uploadedVideo = null;
    }

    if (updates.uploadedVideo) {
      updates.uploadedImage = null;
    }

    return await this.ecranAccueilService.updateEcranAccueil(id, updates);
  }

  @Delete(':id')
  async deleteEcranAccueil(@Param('id') id: number): Promise<void> {
    await this.ecranAccueilService.deleteEcranAccueil(id);
  }

  @Post('upload')
  async upload(
    @Body() body: { fieldToUpdate: string; id: number; fileName: string },
  ) {
    const { fieldToUpdate, id, fileName } = body;

    if (!fileName) {
      throw new BadRequestException('Aucun nom de fichier reçu'); // Validation
    }

    // Valider que le nom est correct et ne contient pas de chemins
    const cleanFileName = fileName.split('\\').pop(); // Extraire uniquement le nom du fichier
    if (!cleanFileName) {
      throw new BadRequestException('Nom de fichier invalide');
    }

    const ecran = await this.ecranAccueilService.getEcranAccueil(id);

    if (!ecran) {
      throw new BadRequestException(`Écran avec l'ID ${id} non trouvé`);
    }

    const fileUrl = `http://localhost:3000/${cleanFileName}`; // Chemin complet

    await this.ecranAccueilService.updateUploadedFile(
      id,
      fieldToUpdate,
      fileUrl,
    );

    return { url: fileUrl };
  }
  @Post('uploadLogo')
  async uploadLogo(@Body() body: { id: number; fileName: string }) {
    const { id, fileName } = body;

    // Valider le nom du fichier
    if (!fileName) {
      throw new BadRequestException('Aucun nom de fichier reçu');
    }

    // Extraire uniquement le nom du fichier
    const cleanFileName = fileName.split(/[/\\]/).pop(); // Récupération du nom du fichier
    if (!cleanFileName) {
      throw new BadRequestException('Nom de fichier invalide');
    }

    // Obtenir l'instance EcranAccueil
    const ecran = await this.ecranAccueilService.getEcranAccueil(id);

    if (!ecran) {
      throw new BadRequestException(`Écran avec l'ID ${id} non trouvé`);
    }

    // Construire l'URL complète du fichier
    const fileUrl = `http://localhost:3000/${cleanFileName}`;

    // Mettre à jour le champ logoPath avec le nouvel URL
    await this.ecranAccueilService.updateUploadedFileLogo(id, fileUrl);

    return { url: fileUrl }; // Retourner l'URL comme réponse
  }
}
