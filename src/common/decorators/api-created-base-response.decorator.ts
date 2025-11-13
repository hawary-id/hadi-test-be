import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResponseDto } from '../dto/base-response.dto';

export const ApiCreatedBaseResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(BaseResponseDto, model),

    ApiCreatedResponse({
      schema: {
        allOf: [
          {
            properties: {
              success: { type: 'boolean', example: true },
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
      description: 'Resource created successfully',
    }),
  );
};
