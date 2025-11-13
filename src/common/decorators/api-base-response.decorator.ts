import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseResponseDto } from '../dto/base-response.dto';

export const ApiBaseResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(BaseResponseDto, model),
    ApiOkResponse({
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
    }),
  );
};
