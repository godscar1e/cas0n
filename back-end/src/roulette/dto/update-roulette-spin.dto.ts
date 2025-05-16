import { PartialType } from '@nestjs/mapped-types';
import { CreateRouletteSpinDto } from './create-roulette-spin.dto';

export class UpdateRouletteSpinDto extends PartialType(CreateRouletteSpinDto) {}
