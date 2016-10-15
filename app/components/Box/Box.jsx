import React from 'react';
import update from 'react/lib/update';
import Card from './Card';
import styles from './box.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      taskData: [{
        id: 1,
        box: this.props.boxId,
        task: 'Write a cool JS library',
        completed: false
      }, {
        id: 2,
        box: this.props.boxId,
        task: 'Make it generic enough',
        completed: false
      }],
      value: ""
    };
  }

  propTypes: {
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
    this.setState({ 
      taskData: this.state.taskData.concat([
        {  
          id: 3,        
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
      <div className={styles.box}>
        <div className={styles.box_header}>  
          <h2 className={styles.box_title}>{this.props.boxTitle}</h2>
          <button className="add-new" onClick={this.handleAddTaskClick.bind(this)}>+</button>
        </div>
        <div className={styles.box_inner}>
          <div className={styles.list_container}>
            <input 
              ref="task_entry"
              className={styles.task_entry}
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

module.exports = Container;