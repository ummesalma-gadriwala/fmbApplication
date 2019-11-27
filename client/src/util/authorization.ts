export const FMB_ROLE_SUPER = 'FMB_ROLE_SUPER';
export const FMB_ROLE_OPERATIONS = 'FMB_ROLE_OPERATIONS';
export const FMB_ROLE_SUBSCRIBER = 'FMB_ROLE_SUBSCRIBER';

export const doesUserBelongsToOperation = (roles: string[]): boolean => {
  return (
    roles && roles.filter(role => role === FMB_ROLE_OPERATIONS).length === 1
  );
};

export const isUserSubscriber = (roles: string[]): boolean => {
  return (
    roles && roles.filter(role => role === FMB_ROLE_SUBSCRIBER).length === 1
  );
};

export const isSuper = (roles: string[]): boolean => {
  return roles && roles.filter(role => role === FMB_ROLE_SUPER).length === 1;
};
