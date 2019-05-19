import React,{Component} from 'react'


export default  class Search extends Component {
    handleClick = () => {
        const {setSearchName} = this.props
        const inputval = this.input.value
        if(inputval){
            setSearchName(inputval)
        }
    }
    render(){       
        return(
            <div>
                <h2>Search github Users</h2>
                <input type="text" ref= {input => this.input=input} />
                <button onClick={this.handleClick}>search</button>
            </div>
           
        )
    }
}