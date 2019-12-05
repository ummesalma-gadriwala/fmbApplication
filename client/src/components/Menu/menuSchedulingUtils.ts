const dateFns = require('date-fns');


export const isMealCancellationEnabled = (cancellationDate:string) => {
  return dateFns.isFuture(dateFns.parseISO(cancellationDate)) &&
          dateFns.differenceInDays(
            dateFns.parseISO(cancellationDate),
            dateFns.addDays(new Date(),2) ) 
                          >=0 
}