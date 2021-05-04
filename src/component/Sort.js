import { Component } from 'react';

class Control extends Component {

    // componentWillReceiveProps(nexProps) {
    //     console.log(nexProps);
    // }

    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy,sortValue)
    }

    render() {
        return (
            <div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Sắp Xếp <span class="fa fa-caret-square-o-down ml-5"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li onClick={() => this.onClick('name', 1) }>
                                <a role="button">
                                    <span class="fa fa-sort-alpha-asc pr-5">
                                        Tên A-Z
                                    </span>
                                </a>
                            </li>
                            <li onClick={() => this.onClick('name', -1) }>
                                <a role="button">
                                    <span class="fa fa-sort-alpha-desc pr-5">
                                        Tên Z-A
                                    </span>
                                </a>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li onClick={() => this.onClick('status', 1) }><a role="button">Trạng Thái Kích Hoạt</a></li>
                            <li onClick={() => this.onClick('status', -1) }><a role="button">Trạng Thái Ẩn</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

export default Control