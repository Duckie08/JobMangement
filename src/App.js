import { Component } from 'react';
import Taskform from './component/Taskform';
import Control from './component/Control';
import TaskList from './component/List';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      fillter: {
        name : '',
        status : -1
      },
      keyword: '',
      sortBy : 'name', //sap xep theo ten
      sortValue : '1' //tang dan
    }
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm : !this.isDisplayForm,
      taskEditing : null
    });
  }


  componentWillMount() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    this.setState({
      tasks: tasks
    });
  }

  s4() {
    return Math.floor((1+Math.random()) * 0x10000 ).toString(16).substring(1);
  }
  generateID() {
    return this.s4() + this.s4() + '-' + this.s4()+ '-' + this.s4();
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false

    })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (data) => {
      var {tasks} = this.state;
      if(data.id === '') {
        data.id = this.generateID();
        tasks.push(data);
      }else{
        //editing
        var index = this.findIndex(data.id);
        tasks[index] = data;
      }

      this.setState({
        tasks : tasks,
        taskEditing : null
      });
      localStorage.setItem('tasks',JSON.stringify(tasks))
  }

  onUpdateStatus = (id) => {
    // console.log(id);
    var {tasks} = this.state;
    var index = this.findIndex(id);
    // console.log(index);
    if(index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }
  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task,index) => {
      if(task.id === id ) {
        // console.log(index)
        result = index;
      }
      
    });
    return result;
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    // console.log(index);
    if(index !== -1) {
      tasks.splice(index,1)
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    } 
    this.onCloseForm() ;
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    // console.log(taskEditing)
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }
  
  onFillter = (fillterName, fillterStatus) => {
    fillterStatus = parseInt(fillterStatus,10); 
    this.setState({
      fillter : {
        name: fillterName,
        status: fillterStatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
  }

  onSort = (sortBy,sortValue) => {
    //  console.log(sortBy,sortValue);
    this.setState({
        sortBy: sortBy,
        sortValue: sortValue
    });
  }


  render() {
    var {tasks, isDisplayForm,taskEditing, fillter, keyword, sortBy, sortValue} = this.state;

    if(fillter){
      if(fillter.name){
          tasks = tasks.filter((task) => {
              return task.name.toLowerCase().indexOf(fillter.name) !== -1;
          })
      }
        tasks = tasks.filter((task) => {
          if(fillter.status === -1){
            return task;
          }else{
             return task.status === (fillter.status === 1 ? true : false);
          }
      })
  }

    var elmTaskForm = isDisplayForm === true
              ?<Taskform 
                      onSubmit={this.onSubmit} 
                      onCloseForm={this.onCloseForm}
                      task={taskEditing}
               /> 
              : '';
    if(keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1; 
      })
    }   
    
    if(sortBy === 'name') {
        tasks.sort((a,b) => {
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
        });
    }else {
      tasks.sort((a,b) => {
      if(a.status > b.status) return -sortValue;
      else if(a.status < b.status) return sortValue;
      else return 0;
    });
      
    }
    return (
      <div className="App">
        <div class="container">
          <div class="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div class="row">
            <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
              {elmTaskForm}
            </div>
            <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
              <button type="button" class="btn btn-primary" 
                      onClick={this.onToggleForm}
              >
                <span class="fa fa-plus mr-5"></span>Thêm Công Việc
              </button>

              <Control 
                    onSearch={this.onSearch} 
                    onSort={this.onSort}
                    sortBy={sortBy}
                    sortValue={sortValue}
              />
              <TaskList 
                      tasks = {tasks} 
                      onUpdateStatus={this.onUpdateStatus}
                      onDelete={this.onDelete} 
                      onUpdate={this.onUpdate}
                      onFillter={this.onFillter}
              />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default App