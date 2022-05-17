import { Address } from 'src/entities/address.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
