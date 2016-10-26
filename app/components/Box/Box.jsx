import React from 'react';
import update from 'react/lib/update';
import Task from '../Task/Task';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import storage from 'electron-json-storage';

@DragDropContext(HTML5Backend)
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      taskData: undefined,
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

  componentWillMount() {
    // check our storage for old tasks if state 
    // is empty (it should be on restart of app)
    if(this.state.taskData === undefined){ 
      console.log('sad!');
      storage.get('task', (error, data) => {
        if (error) return;
        if (data) {
          console.log(data.foo);
          this.setState({taskData: [data.foo]});
        }
      });     
    } else {
      console.log('wasnt reloaded');
    }
  }

  handleAddTask(event){
    // only run on enter keypress
    if (event.which === 13){ 
      event.preventDefault();
      const currentIndex = this.state.totalTasks + 1;
      this.setState({totalTasks : currentIndex});

      const addedTask = {  
        id: currentIndex,        
        box: this.props.boxId, 
        task : this.state.value, 
        completed: false
      };
 
      this.setState({taskData: [addedTask]});

      // save to persistent storage too!
      storage.set('task', { foo : addedTask }, function(error, data) {
        if (error) throw error;
      });

      this.refs.task_entry.value = '';
      this.forceUpdate();
    }
  }

  handleCompletedTasksCount(taskFinished){
    const index = this.state.completedTasks;
    taskFinished ? this.setState({completedTasks: index + 1}) : this.setState({completedTasks: index - 1})
  }

  handleChange(event) {
    var val = event.target.value;
    this.setState({value: val});
  }

  render() {
    const { taskData, totalTasks, completedTasks } = this.state;

    return (
      <div className='box'>
        <div className='box_container'>
          <div className='box_header'>  
            <h2 className='box_title'>{this.props.boxTitle}</h2> 
            <span className='tasks_counter'>{completedTasks} / {totalTasks}</span>
          </div>
          <div className='input_container'>
            <button className='add_new' onClick={this.handleAddTask.bind(this)}>+</button>
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
              {taskData ? taskData.map((task, i) => {
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
              })
            : 'Loading...'
            }
            </div>
        </div>
      </div>
    )

  }
}

module.exports = Box;