import { Test, TestingModule } from '@nestjs/testing';
import { SerialportService } from './serialport.service';

describe('SerialportService', () => {
  let service: SerialportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerialportService],
    }).compile();

    service = module.get<SerialportService>(SerialportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
