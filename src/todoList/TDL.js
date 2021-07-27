import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./TDL.scss";

import moment from "moment";
import dataMock from "./TDL.initData";

// Not work! QAQ
moment.locale("zh-cn");

class TaskNode extends React.Component {
  // taskId taskName taskDesc taskRank taskStatus taskTimeEnd taskLevel subtasks
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography id={this.props.data.taskId} className="targetDate">
            {moment(this.props.data.taskTimeEnd).fromNow()}
          </Typography>
          <Typography variant="h6">{this.props.data.taskStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="taskCard">
          <Card>
            <CardContent>
              <Typography variant="h5">{this.props.data.taskName}</Typography>
              <Typography>{this.props.data.taskDesc}</Typography>
            </CardContent>
          </Card>
        </TimelineContent>
      </TimelineItem>
    );
  }
}

class TDL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
    };
    this.insertT = this.insertTaskNode.bind(this);
    this.generateMockData = this.generateMockData.bind(this);
    this.insertTaskNode = this.insertTaskNode.bind(this);
    this.addModifyDateHook = this.addModifyDateHook.bind(this);
  }

  generateMockData() {
    let dataInit = dataMock;
    this.setState((prev) => {
      return Object.assign({}, prev, { taskList: dataInit });
    });
  }

  insertTaskNode(e) {
    e.preventDefault();
    if (document.newTaskForm.newTaskName.value) {
      let newTask = {
        taskName: document.newTaskForm.newTaskName.value,
        taskDesc: document.newTaskForm.newTaskDesc.value,
        taskRank: 0,
        taskStatus: "[X]",
        taskTimeEnd: document.newTaskForm.date.value,
        taskLevel: 0,
        subtasks: [],
      };
      this.setState((prev) => {
        return Object.assign({}, prev, {
          taskList: prev.taskList.concat([newTask]),
        });
      });
    } else {
      document.getElementById("newTaskName").placeholder = "至少在这里写点东西";
    }
  }

  addModifyDateHook(){
    document.getElementsByClassName("targetDate")
  }

  componentDidMount() {
    this.generateMockData();
    this.addModifyDateHook();
  }
  componentWillUnmount() {}

  generateTaskList() {
    return this.state.taskList.map((it, idx) => {
      return <TaskNode key={idx} data={it} />;
    });
  }

  render(h) {
    return (
      <Container className="TDL">
        <Box id="title">
          <h1>
            End Less Front End
            <br />
            Task Board
          </h1>
          <h2>React Ver.</h2>
        </Box>
        <Box id="timeline-container">
          <Timeline align="left" id="timeline">
            {this.generateTaskList()}
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography>新增条目</Typography>
                <Typography variant="h6">状态</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <Card>
                  <CardContent>
                    <form name="newTaskForm">
                      <label>任务名称</label>
                      <TextField id="newTaskName"></TextField>
                      <br />
                      <label>任务描述</label>
                      <TextField id="newTaskDesc"></TextField>
                      <br />
                      <label>截止日期</label>
                      <Box>
                        <TextField
                          id="date"
                          type="date"
                          defaultValue={moment().format("YYYY-MM-DD")}
                          // className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <br />
                        <Button
                          variant="outlined"
                          type="submit"
                          onClick={this.insertTaskNode}
                        >
                          Add
                        </Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
      </Container>
    );
  }
}

export default TDL;
