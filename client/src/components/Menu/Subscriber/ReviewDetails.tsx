import 'date-fns';
import React, { Component } from 'react';
import requireAuth from '../../../requireAuth';
import Spinner from '../../Spinner/Spinner';
import * as scheduleAction from '../../../reducers/scheduleAction';


import { connect } from 'react-redux';

import {
  Schedule,
  AppState,
  MenuItem as FoodMenuItems,
  Review,
  SubscriptionSchedule
 } from '../../../type/Type';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FormControlLabel    from '@material-ui/core/FormControlLabel';
import Button    from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel    from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormControl    from '@material-ui/core/FormControl';
import { Alert } from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


import './MenuDetails.css';
const dateFns = require('date-fns');



class ReviewDetails extends Component<any, any> {

  constructor(props: any) {
    super(props);
    const {
      match: { params }
    } = this.props;

    this.state = {
                   currentDate: dateFns.parseISO(params.currentDate),
                   questionAnswer:[
                    {
                      messageLabel:"overallMealExperience",
                      messageValue: null 
                    },
                    {
                      messageLabel:"foodQuality",
                      messageValue: null 
                    },
                    {
                      messageLabel:"foodQuantity",
                      messageValue: null
                    },
                    {
                      messageLabel:"comments",
                      messageValue: ''
                    }
                  ],
                   inValidForm: false,
                   isReviewProvided: false
                };
  }
  componentDidMount() {
    
    if( this.props.schedules && this.props.schedules.length === 0){
      this.props.getMonthsSchedule()
    }
    //if(!this.props.selectedDateSchedule || !this.props.selectedDateSchedule.review) {
      this.props.getReviewForUserByDate(this.props.username, dateFns.format(this.state.currentDate, 'yyyy-MM-dd', {awareOfUnicodeTokens: true}) )
    //}
    
  }

  componentDidUpdate(prevProps, prevState) {
    if( this.props.selectedDateSchedule !== prevProps.selectedDateSchedule || 
      this.state.questionAnswer !== prevState.questionAnswer ) {
      this.props.selectedDateSchedule.review &&
      this.setState ({
        reviewId: this.props.selectedDateSchedule.review.id, 
        scheduleDate: this.props.selectedDateSchedule.review.scheduleDate,
        questionAnswer: this.props.selectedDateSchedule.review.questionAnswer,
        subscriberId: this.props.subscriberId,
        username: this.props.username,
        isReviewProvided: this.props.selectedDateSchedule.review.questionAnswer ? true : false  
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextState)
  //   console.log(this.state)
  //   if( this.props.selectedDateSchedule !== nextProps.selectedDateSchedule ||
  //       this.state.questionAnswer !== nextState.questionAnswer
  //      ){
  //     return true
  //   }
  //   return false;
  // }

  render() {
    const buildMenuItem = (
      menuItems: FoodMenuItems[] | null,
      ) => {
      return (
        menuItems &&
        menuItems.map((menuItem: FoodMenuItems, index: number) => {
          return (
            <span className="Dashboard-menu-items-each" key={index}>
              {' '}
              &#x2726; {menuItem.itemName}
            </span>
          );
        })
      );
    };

    const handleQuestionChanges = ( question, answer ) => {
      this.state.questionAnswer.map((questionAnswer) => {
        if(questionAnswer.messageLabel===question) {
          questionAnswer.messageValue = answer
          return questionAnswer
        }
        return questionAnswer
      });

      this.setState({questionAnswer : this.state.questionAnswer})
    } 

    const getAnswerForQuestion = (qusetionAnswers, question:string ) => {
      return qusetionAnswers.find( qusetionAnswer => qusetionAnswer.messageLabel === question).messageValue
    }

    const validateAndPost = () => {
       if(this.state.isReviewProvided){
        this.props.history.goBack() 
        return
       }
       if(this.state.questionAnswer && !getAnswerForQuestion(this.state.questionAnswer, 'overallMealExperience')  
                               && !getAnswerForQuestion(this.state.questionAnswer, 'foodQuality') 
                               && !getAnswerForQuestion(this.state.questionAnswer, 'foodQuantity') 
                              ) {
            this.setState({inValidForm : true})
            return;                    
        } else {
            this.setState({inValidForm : false})
            const review : Review = {
              id: this.state.reviewId, 
              scheduleDate: dateFns.format(this.state.currentDate, 'yyyy-MM-dd', {awareOfUnicodeTokens: true}),
              subscriberId: this.props.subscriberId,
              username: this.props.username,
              questionAnswer:[
                {
                  messageLabel:"overallMealExperience",
                  messageValue: getAnswerForQuestion(this.state.questionAnswer, 'overallMealExperience') 
                },
                {
                  messageLabel:"foodQuality",
                  messageValue: getAnswerForQuestion(this.state.questionAnswer, 'foodQuality') 
                },
                {
                  messageLabel:"foodQuantity",
                  messageValue: getAnswerForQuestion(this.state.questionAnswer, 'foodQuantity')
                },
                {
                  messageLabel:"comments",
                  messageValue: getAnswerForQuestion(this.state.questionAnswer, 'comments')
                }
              ]
            }
          this.props.addScheduleReviw(review,this.props.history.goBack)
          this.props.history.goBack()                      
        } 
    }
   

    return (
      
      <div>
      
        <Paper className="MenuDetails-header">
          <strong>
            {` Menu For ${ dateFns.format(this.state.currentDate, 'dd-MMM-yyy', {
              awareOfUnicodeTokens: true
            })}`}{' '}
          </strong>
        </Paper>
        <React.Fragment>
          { this.state.inValidForm && 
            <div className="Review-validation-error">
              <Alert color="danger">
                Please answer required questions.!!!
              </Alert>  
            </div>
          }          
          <div className="MenuDetails-container">
            <div className="MenuDetails-card-container">
              <Spinner active={this.state.isBusy}>
                <Card className="Card-container">
                  <CardContent>
                    {this.props.selectedDateSchedule &&
                    this.props.selectedDateSchedule.menu &&
                      this.props.selectedDateSchedule.menu.items.length > 0 && (
                      <React.Fragment>
                          <div className="Dashboard-menu-container">
                            <div className="Dashboard-menu-primary-container Dashboard-menu-container_items">
                              <Typography>
                                <strong>Review</strong>
                              </Typography>
                              <Typography component="div">
                                <div className="Dashboard-menu-items">
                                  {buildMenuItem(
                                    this.props.selectedDateSchedule.menu &&
                                      this.props.selectedDateSchedule.menu.items
                                  )}
                                </div>
                              </Typography>
                            </div>
                          </div>
                         { this.state && this.state.questionAnswer &&  
                          
                          <div className="review-option-container">
                            <Box>
                              <Typography component="legend" ><strong>Overall Thali experience</strong></Typography>
                              <Rating
                                name="overallMealExperience"
                                value={ this.state.questionAnswer && getAnswerForQuestion(this.state.questionAnswer , 'overallMealExperience') }
                                onChange={(event, newValue) => {
                                  handleQuestionChanges('overallMealExperience', newValue)
                                }}
                                disabled = { this.state.isReviewProvided }
                                
                              />
                            </Box>

                            <Box>
                              <Typography component="legend" ><strong>Food Quality</strong></Typography>
                              <Rating
                                name="foodQuality"
                                value={ this.state.questionAnswer && getAnswerForQuestion(this.state.questionAnswer , 'foodQuality') }
                                onChange={(event, newValue) => {
                                  handleQuestionChanges('foodQuality', newValue)
                                }}
                                disabled = { this.state.isReviewProvided }
                                
                              />
                            </Box>
                                                   
                            <Box>
                              <Typography component="legend" ><strong>Food Quanity</strong></Typography>
                              <Rating
                                name="foodQuantity"
                                value={ this.state.questionAnswer && getAnswerForQuestion(this.state.questionAnswer , 'foodQuantity') }
                                onChange={(event, newValue) => {
                                  handleQuestionChanges('foodQuantity', newValue)
                                }}
                                disabled = { this.state.isReviewProvided }
                                
                              />
                            </Box>

                            <TextField
                              id="outlined-multiline-static"
                              label="Comments"
                              multiline
                              rowsMax="7"
                              fullWidth
                              variant="outlined"
                              value = {this.state.questionAnswer.find( question => question.messageLabel === 'comments').messageValue  }
                              onChange={(event:any)=> handleQuestionChanges('comments', event.target.value) }
                              disabled = { this.state.isReviewProvided } 
                            />
                         </div>
                         }
                         <div className = "MenuDetails-quantity-action-container">
                          <FormControl margin="dense" >
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={()=> validateAndPost()}
                              >
                                 {this.state.isReviewProvided? "Back" : "Save"  } 
                              </Button>
                            </FormControl>
                        </div> 
                      </React.Fragment>     
                      
                    )}
                  </CardContent>
                </Card>
              </Spinner>
            </div>
            </div>
         </React.Fragment>
      
      </div>
                                  
    
    );
  }
}

const mapStateToProps = (state: AppState, ownProps:any) => {
  return  {
    selectedDateSchedule: state.schedules.find(
                schedule =>
                  schedule.dailyDate === (ownProps && ownProps.match.params.currentDate)
              ) as Schedule,
    subscriberId: state.authentication.decodedToken.subscriberId,
    username: state.authentication.decodedToken.username,
    mealSchedule: state.mealSchedule as SubscriptionSchedule,
    schedules: state.schedules
  };
};


export default requireAuth(connect(mapStateToProps, scheduleAction)(ReviewDetails));
