import { Component } from 'react';

class Taskform extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false

    };
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (name === 'status') {
      value = target.value === "true" ? true : false
    }
    this.setState({
      [name]: value
    });
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  render() {
    var {id} = this.state;
    return (
      <div>
        <div class="panel panel-warning">
          <div class="panel-heading">
            <h3 className="panel-title">
              {id !== '' ? 'Update' : 'Them cong viec'}
              <span className=" fa fa-times-circle text-right" 
                    onClick={this.onCloseForm}>      
              </span>
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label>Tên :</label>
                <input type="text" 
                       class="form-control" 
                       name='name' 
                       value={this.state.name} 
                       onChange={this.onChange} />
              </div>
              <label>Trạng Thái :</label>
              <select class="form-control" 
                      required="required" 
                      name='status' 
                      value={this.state.status} 
                      onChange={this.onChange}
              >
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div class="text-center">
                <button type="submit" 
                        class="btn btn-warning" 
                        onClick={this.onHandleChange}
                >Thêm</button>&nbsp;
                                <button type="submit"
                  class="btn btn-danger"
                  onClick={this.onClear}
                >Hủy Bỏ</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Taskform