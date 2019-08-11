import { FieldResolver, Root, Int, Resolver, ID, Query, Arg, ResolverInterface, ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Address" })
export class Address {
    id: string;

    @Field(type => Int)
    number: number;

    @Field()
    street: string;
}

@ObjectType({ description: "The Customer Details" })
export class Customer {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  address?: Address;
}

@Resolver(of => Customer)
export class CustomerResolver implements ResolverInterface<Customer> {
  private readonly data: Customer[] = getCustomers()

  @Query(returns => Customer)
  async customer(@Arg("id") id: string): Promise<Customer | undefined> {
    return await this.data.find(({ id: i }) => i === id);
  }

  @Query(returns => [Customer])
  async customers(): Promise<Customer[]> {
    return await this.data;
  }

  @FieldResolver()
  async address(@Root() customer: Customer): Promise<Address | undefined> { 
    return await getAddress().find(({ id }) => id === customer.id)
  }
}

function getCustomers(): Customer[] {
  return [
    { id: '1', name: 'Dave'},
    { id: '2', name: 'Barry'},
    { id: '3', name: 'Charlie'}
  ]
}


function getAddress(): Address[] {
  return [
    { id: '1', number: 12, street: 'foo' }
  ]
}
