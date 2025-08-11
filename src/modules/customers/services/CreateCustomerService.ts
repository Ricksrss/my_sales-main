import AppError from "@modules/shared/errors/AppError";
import { customerRepository } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";

interface IRequest{
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email}: IRequest): Promise<Customer> {
    const emailExists = await customerRepository.findByEmail(email);

    if ( emailExists){
      throw new AppError("Email already used", 409);
    }

    const customer = customerRepository.create({
      name,
      email,
    });
    await customerRepository.save(customer);
    return customer;
  }
}
