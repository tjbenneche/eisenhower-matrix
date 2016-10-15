import React from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      taskData: [],
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

  handleAddTaskClick(){
    const currentId = this.state.taskData.length + 1;
    this.setState({ 
      taskData: this.state.taskData.concat([
        {  
          id: currentId,        
          box: this.props.boxId, 
          task : this.state.value, 
          completed: false
        }
      ])
    }, function(){
      // clear field
      this.refs.task_entry.value = '';
    });  
  }

  handleChange(event) {
    var val = event.target.value;
    this.setState({value: val});
  }

  getItems() {
    const data = this.state.taskData;
    const rows = [];

    data.forEach(function(dataItem){
      rows.push(
        <div>
          <ListItem              
            isComplete={dataItem.completed}
            key={dataItem._id} 
            itemTitle={dataItem.task} 
          />
        </div>
      );
    });
    return rows;
  }

  render() {
    const { taskData } = this.state;
    return (
      <div className='box'>
        <div className='box_header'>  
          <h2 className='box_title'>{this.props.boxTitle}</h2>
          <button className='add_new' onClick={this.handleAddTaskClick.bind(this)}>Add</button>
        </div>
        <div className='box_inner'>
          <div className='list_container'>
            <input 
              ref="task_entry"
              className='task_entry'
              type="text" 
              placeholder="Enter task"
              value={this.state.value}
              onChange={this.handleChange.bind(this)} 
            />
            {taskData.map((card, i) => {
              return (
                <Card 
                  key={card.id}
                  index={i}
                  id={card.id}
                  task={card.task}
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