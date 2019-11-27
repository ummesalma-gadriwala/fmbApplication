export const workFlowRouteProcessor = (
  history: any,
  defaultRoute: string,
  workFlowRoute?: string
) => {
  return workFlowRoute
    ? history.push(workFlowRoute)
    : history.push(defaultRoute);
};
