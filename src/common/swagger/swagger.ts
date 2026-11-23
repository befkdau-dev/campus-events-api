import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const config = new DocumentBuilder()
  .setTitle('Campus Fair API')
  .setDescription('Campus Event For Campus Student')
  .setVersion('1.0')
  .addTag('events', 'Events for students')
  .addTag('sessions', 'Sessions under an event')
  .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' })
  .build();
