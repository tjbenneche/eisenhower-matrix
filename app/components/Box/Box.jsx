import React from 'react';
import update from 'react/lib/update';
import Task from '../Task/Task';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      taskData: [],
      totalTasks: 0,
      completedTasks: 0,
      value: ""
    };
  }

  static propTypes = {
    boxTitle: React.PropTypes.string,
    boxId: React.PropTypes.string
  }

  moveCard(dragIndex, hoverIndex) {
    const { taskData } = this.state;
    const dragCard = taskData[dragIndex];

    this.setState(update(this.state, {
      taskData: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  handleAddTask(event){
    if (event.which === 13){
      event.preventDefault();
      const currentIndex = this.state.taskData.length + 1;
      this.setState({totalTasks: currentIndex });

      this.setState({ 
        taskData: this.state.taskData.concat([
          {  
            id: currentIndex,        
            box: this.props.boxId, 
            task : this.state.value, 
            completed: false
          }
        ])
      }, function(){
        // clear field
        this.refs.task_entry.value = '';
      }); 
    } else {
      // do nothing unless Enter Key
    }
 
  }

  handleCompletedTasksCount(taskFinished){
    const completedIndex = this.state.completedTasks;
    if(taskFinished){
      this.setState({completedTasks: completedIndex + 1});
    } else if (!taskFinished) {
      this.setState({completedTasks: completedIndex - 1});
    }
  }

  handleChange(event) {
    var val = event.target.value;
    this.setState({value: val});
  }

  render() {
    const { taskData } = this.state;

    return (
      <div className='box'>
        <div className='box_container'>
          <div className='box_header'>  
            <h2 className='box_title'>{this.props.boxTitle}</h2> 
            <span className='tasks_counter'>{this.state.completedTasks} / {this.state.totalTasks}</span>
          </div>
          <div className='input_container'>
            <button 
              className='add_new' 
              onClick={this.handleAddTask.bind(this)}>
              +
            </button>
            <input 
              ref="task_entry"
              className='task_entry'
              type="text" 
              placeholder="Enter Task"
              value={this.state.value}
              onKeyPress={this.handleAddTask.bind(this)}
              onChange={this.handleChange.bind(this)} 
            />
          </div>
          <div className='box_inner'>
              {taskData.map((task, i) => {
                return (
                  <Task 
                    key={task.id}
                    index={i}
                    id={task.id}
                    task={task.task}
                    taskComplete={this.handleCompletedTasksCount.bind(this)}
                    moveCard={this.moveCard} 
                    />
                );
              })}
            </div>
        </div>
      </div>
    );
  }
}

module.exports = Box;