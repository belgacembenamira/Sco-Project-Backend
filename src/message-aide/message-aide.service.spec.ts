import { Test, TestingModule } from '@nestjs/testing';
import { MessageAideService } from './message-aide.service';

describe('MessageAideService', () => {
  let service: MessageAideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageAideService],
    }).compile();

    service = module.get<MessageAideService>(MessageAideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
