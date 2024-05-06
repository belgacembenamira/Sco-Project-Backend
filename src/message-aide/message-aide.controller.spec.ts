import { Test, TestingModule } from '@nestjs/testing';
import { MessageAideController } from './message-aide.controller';

describe('MessageAideController', () => {
  let controller: MessageAideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageAideController],
    }).compile();

    controller = module.get<MessageAideController>(MessageAideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
