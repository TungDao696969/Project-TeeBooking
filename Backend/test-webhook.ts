import { sepayWebhookController } from './src/controllers/sepayWebhook.controller';
import { Request, Response } from 'express';

async function test() {
  const req = {
    body: {
      id: 12345,
      content: 'Nguyen Van A chuyen tien BK74416381',
      transferAmount: 2000,
      referenceCode: 'MB123456789'
    }
  } as Request;

  const res = {
    status: (code: number) => ({
      json: (data: any) => console.log(`Response ${code}:`, data)
    }),
    sendStatus: (code: number) => console.log(`Response ${code}`)
  } as unknown as Response;

  await sepayWebhookController(req, res);
}

test();
