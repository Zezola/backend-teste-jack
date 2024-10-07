import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
    @ApiProperty()
    completed: boolean
    @ApiProperty()
    userId: number
}
