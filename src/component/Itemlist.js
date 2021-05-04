import { Component } from 'react';

class Itemlist extends Component {

   

    onUpdateStatus = () => {
        // console.log(this.props.task.id);
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }
    
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        // sao dung cai nay k task.name dc
        var {task,index} = this.props;
        return(
              <tr>
                <td>{index+1}</td>
                <td>{this.props.task.name}</td>
                <td class="text-center">
                    <span className={this.props.task.status  === true 
                                    ? 'label label-success' 
                                    : 'label label-danger'}
                                    onClick={this.onUpdateStatus}>
                    {this.props.task.status === true ? 'Kích hoạt' : 'Ẩn'}         
                    </span>
                </td>
                <td class="text-center">
                    <button type="button"
                            class="btn btn-warning"
                            onClick={this.onUpdate}
                    >
                        <span class="fa fa-pencil mr-5"></span>Sửa
                </button>
                &nbsp;
                <button type="button" 
                        className="btn btn-danger"
                        onClick={this.onDelete}>
                        <span class="fa fa-trash mr-5"></span>Xóa
                </button>
                </td>
            </tr>
        )
    }
}

export default Itemlist