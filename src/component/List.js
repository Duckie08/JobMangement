import { Component } from 'react';
import Itemlist from './Itemlist'

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : 1,
            filterStatus: -1 //1 active 0 deacitve
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.props.onFillter(
            name === 'fillterName' ? value : this.state.fillterName,
            name === 'fillterStatus' ? value : this.state.fillterStatus
        )
        this.setState({
            [name] :value
        });

    }

    render() {
        var {tasks} = this.props;
        var {fillterName, fillterStatus} = this.state;

        
        var elmTasks = tasks.map((task,index)=> 
            <Itemlist 
                task={task} 
                index={index} 
                key={task.id}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}    
                onUpdate={this.props.onUpdate}
            />
        );

        return(
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th class="text-center">STT</th>
                    <th class="text-center">Tên</th>
                    <th class="text-center">Trạng Thái</th>
                    <th class="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text"
                               class="form-control" 
                               name="fillterName"
                               value={fillterName}
                               onChange={this.onChange }
                            //    onFillter={this.props.onFillter}
                               />
                    </td>
                    <td>
                        <select class="form-control"
                                name="fillterStatus"
                                value={fillterStatus}
                                onChange={this.onChange }
                                // onFillter={this.props.onFillter}
                                >
                            <option value="-1">Tất Cả</option>
                            <option value="0">Ẩn</option>
                            <option value="1">Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmTasks}
            </tbody>
        </table>
        )
    }
}

export default TaskList