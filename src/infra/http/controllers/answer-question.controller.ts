import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'

const answerQuestionBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema)

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
    @CurrentUser() user: TokenPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const { sub: authorId } = user

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
