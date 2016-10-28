import React from 'react';
import update from 'react/lib/update';
import Task from '../Task/Task';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import storage from 'electron-json-storage';

@DragDropContext(HTML5Backend)
class BoxContainer extends React.Component {
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

  componentWillMount() {
    // if our state taskData is empty, check the persistent
    // storage for tasks to populate boxes with

    let storageKey = this.props.boxId + '_tasks';
    if(this.state.taskData.length === 0){ 
      storage.get(storageKey, (error, data) => {
        if (error) return;
        if (data.foo) {
          let rData = data.foo
          this.setState({totalTasks: rData.length - 1});
          this.setState({taskData: data.foo});
        } else {
          const errorData = {
            id: 0, 
            boxId: this.props.boxId, 
            task: 'Error in componentWillMount()', 
            completed: false
          };
          this.setState({taskData: [errorData] });
        }
      });     
    } else {
      // do nothing
      console.warn('Error: componentWillMount()');
    }
  }

  handleAddTask(event){
    let storageKey = this.props.boxId + '_tasks';

    // only run on enter keypress
    if (event.which === 13){ 
      event.preventDefault();
      const currentIndex = this.state.totalTasks + 1;
      const newTask = {  
            id: currentIndex,        
            box: this.props.boxId,  
            task : this.state.value, 
            completed: false
      };
      const newArray = this.state.taskData.concat(newTask);
      this.setState({totalTasks : currentIndex});
      this.setState({ taskData: newArray}, function(){
          this.refs.task_entry.value = '';
      });

      // save to persistent storage too!
      storage.set(storageKey, { foo : newArray }, function(error, data) {
        if (error) throw error;
        storage.get(storageKey, function(error, data) {
        })
      });        
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

  deleteAll(){
    storage.clear(function(error){
      console.log('cleared');
    });
  }

  render() {
    const { taskData, totalTasks, completedTasks } = this.state;
    return (
      <div className={'box' + ' ' + this.props.boxId}>
        <div className='box_container'>
          <div className='box_header'>  
            <h2 className='box_title'>{this.props.boxTitle}</h2> 
            <span className='tasks_counter'>{completedTasks} / {totalTasks}</span>
          </div>
          <div className='input_container'>
            <button className='add_new' onClick={this.handleAddTask.bind(this)}>+</button>
            <button className='clear_all' onClick={this.deleteAll.bind(this)}>Clear</button>
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
                if(task.box === this.props.boxId){
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
                }
              }) : null
            }
            </div>
        </div>
      </div>
    )

  }
}

module.exports = BoxContainer;
