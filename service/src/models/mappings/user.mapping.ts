import { UserEntity } from '../entities/user.entity';
import { UserPresenter } from '../presenters/user.presenter';

export class UserMapping {
  static mapToPresenter(userEntity: UserEntity): UserPresenter {
    return new UserPresenter({
      id: userEntity.id,
      name: userEntity.name,
      username: userEntity.username,
      email: userEntity.email,
      address: {
        street: userEntity.address.street,
        suite: userEntity.address.suite,
        city: userEntity.address.city,
        zipcode: userEntity.address.zipcode,
        geo: {
          lat: userEntity.address.geo.lat,
          lng: userEntity.address.geo.lng,
        },
      },
      phone: userEntity.phone,
      website: userEntity.website,
      company: {
        name: userEntity.company.name,
        catchPhrase: userEntity.company.catchPhrase,
        bs: userEntity.company.bs,
      },
    });
  }

  static mapToPresenterArray(userEntities: UserEntity[]): UserPresenter[] {
    const usersPresenter = [];
    userEntities.forEach((userEntity) => {
      usersPresenter.push(this.mapToPresenter(userEntity));
    });
    return usersPresenter;
  }
}
