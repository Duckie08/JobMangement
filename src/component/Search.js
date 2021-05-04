import { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value 
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        var {keyword} = this.state;
        return (
            <div>
               <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="input-group">
                            <span class="input-group-btn">
                            <input type="text" 
                                   class="form-control" 
                                   placeholder="Nhập từ khóa..."
                                   onChange={this.onChange}    
                                   value = {keyword} 
                                   name="keyword"  
                            />
                                <button class="btn btn-primary" 
                                        type="submit" 
                                        onClick={this.onSearch}>

                                    <span class="fa fa-search mr-5"></span>Tìm     
                                </button>
                            </span>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Search