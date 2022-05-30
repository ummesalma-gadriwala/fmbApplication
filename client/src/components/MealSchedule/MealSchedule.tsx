import 'date-fns';
import React, { Component } from 'react';
import requireAuth from '../../requireAuth';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { OverrideSchedule, AppState } from '../../type/Type';
import './MealSchedule.css';
import * as mealscheduleAction from '../../reducers/mealscheduleAction';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';
import ListOverrideMealSchedule from './ListOverrideMealSchedule';
import Divider from '@material-ui/core/Divider';

const dateFns = require('date-fns');

interface IMealScheduleState {
  existingPlanOverrides?: [OverrideSchedule];
  newPlanOverride: OverrideSchedule;
  thaliSchedule: Record<string, any>;
  isBusy: boolean;
  isInValid: boolean;
}

class MealSchedule extends Component<any, IMealScheduleState> {
  constructor(props: any) {
    super(props);
    this.handleMealCountChange = this.handleMealCountChange.bind(this);
    const newPlanOverride: OverrideSchedule = {
      overrideStartDate: dateFns.addDays(new Date(), 2),
      overrideEndDate: dateFns.addDays(new Date(), 3),
      weeklyOverrideSchedule: {
        MONDAY: null,
        TUESDAY: null,
        WEDNESDAY: null,
        THURSDAY: null,
        FRIDAY: null
      }
    };
    this.state = {
      newPlanOverride: newPlanOverride,
      thaliSchedule: {},
      isBusy: false,
      isInValid: false
    };
  }
  componentDidMount() {
    this.setState({ isBusy: true });
    this.props.getSubscriptionSchedule(this.props.subscriberId);
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.mealSchedule !== prevProps.mealSchedule &&
      this.props.mealSchedule.optedSchedule
    ) {
      this.setState({
        isBusy: false,
        thaliSchedule: this.props.mealSchedule.optedSchedule,
        existingPlanOverrides: this.props.mealSchedule.overrideSchedules
      });
    }
    if (
      this.props.mealSchedule !== prevProps.mealSchedule &&
      this.props.mealSchedule.overrideSchedules !=
        prevProps.mealSchedule.overrideSchedules
    ) {
      this.setState({
        isBusy: false,
        existingPlanOverrides: this.props.mealSchedule.overrideSchedules
      });
    }
  }

  handleMealCountChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name: string = target.name;
    const changedOverridePlan: OverrideSchedule = Object.assign(
      {},
      this.state.newPlanOverride
    );
    const changedKey = Object.keys(
      this.state.newPlanOverride.weeklyOverrideSchedule
    ).find(key => key === name);
    //@ts-ignore
    changedOverridePlan.weeklyOverrideSchedule[changedKey] = value;
    this.setState({
      newPlanOverride: changedOverridePlan
    });
  }

  render() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    };
    const validateAndOverride = () => {
      this.setState({ isInValid: false });
      const isValidDate: boolean =
        dateFns.differenceInHours(
          this.state.newPlanOverride.overrideEndDate,
          this.state.newPlanOverride.overrideStartDate
        ) < 0;
      this.setState({ isInValid: isValidDate });

      if (!isValidDate) {
        this.setState({ isBusy: true });
        const cancelPlan: OverrideSchedule = Object.assign(
          {},
          this.state.newPlanOverride
        );
        cancelPlan.weeklyOverrideSchedule.MONDAY = '0';
        cancelPlan.weeklyOverrideSchedule.TUESDAY = '0';
        cancelPlan.weeklyOverrideSchedule.WEDNESDAY = '0';
        cancelPlan.weeklyOverrideSchedule.THURSDAY = '0';
        cancelPlan.weeklyOverrideSchedule.FRIDAY = '0';
        cancelPlan.weeklyOverrideSchedule.SATURDAY = '0';
        cancelPlan.weeklyOverrideSchedule.SUNDAY = '0';
        this.setState({
          newPlanOverride: cancelPlan
        });
        return this.props.addOverrideSchedule(
          this.props.subscriberId,
          this.state.newPlanOverride,
          null,
          () => this.setState({ isBusy: false })
        );
      }
    };

    return (
      <div className="MainSchedule-Container">
        {this.state.isInValid && (
          <div>
            <Alert color="warning">Please Enter Valid Date</Alert>
          </div>
        )}
        <Spinner active={this.state.isBusy}>
          <ListOverrideMealSchedule
            overrideSchedules={this.props.mealSchedule.overrideSchedules}
            deleteOverrideScheduleFunc={this.props.deleteOverrideSchedule}
            subscriberId={this.props.subscriberId}
          />
          <div className="Margin-Container">
            <h6> Vacation Planner </h6>
            <Divider />
            <p>
              Please select dates where you dont want thali prepared for your
              family
            </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="MealSchedule-Datepicker-Container">
                <DatePicker
                  name={'startDate'}
                  minDate={dateFns.format(
                    dateFns.addDays(new Date(), 2),
                    'yyyy-MM-dd',
                    { awareOfUnicodeTokens: true }
                  )}
                  maxDate={dateFns.format(
                    dateFns.addMonths(new Date(), 1),
                    'yyyy-MM-dd',
                    { awareOfUnicodeTokens: true }
                  )}
                  margin="normal"
                  label="From Date"
                  value={this.state.newPlanOverride.overrideStartDate}
                  onChange={value => {
                    const changedOverridePlan: OverrideSchedule = Object.assign(
                      {},
                      this.state.newPlanOverride
                    );
                    changedOverridePlan.overrideStartDate = value;
                    this.setState({ newPlanOverride: changedOverridePlan });
                  }}
                />
                <DatePicker
                  name={'endDate'}
                  minDate={dateFns.addDays(new Date(), 3)}
                  maxDate={dateFns.addMonths(new Date(), 5)}
                  margin="normal"
                  label="To Date"
                  value={this.state.newPlanOverride.overrideEndDate}
                  onChange={value => {
                    const changedOverridePlan: OverrideSchedule = Object.assign(
                      {},
                      this.state.newPlanOverride
                    );
                    changedOverridePlan.overrideEndDate = value;
                    this.setState({ newPlanOverride: changedOverridePlan });
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>

            <div className="Margin-Container">
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                //@ts-ignore
                onClick={() => validateAndOverride()}
              >
                Cancel Thali
              </Button>
            </div>
          </div>
        </Spinner>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => {
  return Object.assign({}, state, {
    subscriberId: state.authentication.decodedToken.subscriberId,
    mealSchedule: state.mealSchedule
  });
};

export default requireAuth(
  connect(mapStateToProps, mealscheduleAction)(MealSchedule)
);
