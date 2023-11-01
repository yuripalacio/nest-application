import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber register (listening the event "answer created")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Creating an answer but WITHOUT sabe in database
    const aggregate = CustomAggregate.create()

    // Ensuring that the event was created but was NOT dispatched.
    expect(aggregate.domainEvents).toHaveLength(1)

    // Saving the answer on Database and then dispatch the event.
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // The subscriber listens the event and do what is necessary with the data
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
