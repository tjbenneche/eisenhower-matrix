import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import storage from 'electron-json-storage';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false
    };
  }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    taskComplete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    task: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  handleCheck(event){
    if (this.state.completed === false){
      const index = this.props.index;
      const boxData = this.props.box + '_tasks';
      let currentTask;

      this.setState({completed: true}, function(){
        this.props.taskComplete(this.state.completed);
      });

      // const tempArray = storage.get(boxData, 
      //   function(error, data) {
      //     if (error) throw error;
      //     currentTask = data.foo[index];
      //     currentTask.completed = true;
      //     console.log(currentTask);
      //     storage.set(boxData, { foo : [currentTask] }, function(error, data) {
      //       if (error) throw error;
      //       }); 
      //   });

    } else {
      this.setState({completed: false}, function(){
        this.props.taskComplete(this.state.completed);
      });
    }
  }

  render() {
    const { task, isDragging, connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(
      <div className={this.state.completed ? "task_strikethrough" : "task"}>
        <input 
          className='task_checkbox'
          type="checkbox" 
          onChange={this.handleCheck.bind(this)} />
        {task}
      </div>
    ));
  }
}