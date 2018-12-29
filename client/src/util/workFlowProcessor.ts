
export const workFlowRouteProcessor = ( history:any, defaultRoute:String, workFlowRoute?:String )   => {
    return workFlowRoute ? history.push(workFlowRoute) : history.push(defaultRoute);
}