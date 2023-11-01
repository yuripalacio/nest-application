import { UniqueEntityId } from '../entities/unique-entity-id'

/**
 * Basically a contract which specify the domain event structure.
 * Every time when we have an event, this event is a class and need to extend this entity
 */
export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
