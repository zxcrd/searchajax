import React,{Component} from 'react'
import './main.css'
import axios from 'axios'
export default  class Main extends Component {
//这个组件要显示四种状态，1：搜索开始之前，提示用户输入文本 2.搜索开始，界面应该显示正在搜索 3.搜索完成成功界面 4.搜索完成失败界面
    state = {
        init:true,
        loading:false,
        success:null,
        err:null,
    }
//现在的问题是：兄弟组件怎么传数据？ 因为search组件需要点击按钮，main组件才发送请求，再一个main组件需要接受search中输入框中的数据
//解决方案：search组件告诉父组件，父组件再传给main组件

//在search组件中，当单击按钮时，会将用户输入的数据传给父组件，父组件修改state中的状态，重新render，会将数据传给子组件main，main虽然接收到了数据，但是怎么在接到数据时就发送请求呢
//react有一个钩子是组件接收到新传过来的props属性时的生命周期函数，可以在这个阶段发送请求
    componentWillReceiveProps(newProps){
        const {searchName} = newProps
        //更新状态，显示的界面
        
        this.setState({
            init:false,
            loading:true
        })
        //发送请求
        const url = `https://api.github.com/search/users?q=${searchName}`
        axios.get(url)
        .then((response) => {
            //得到相应数据，更新状态
            const result = response.data
            //我们只取出需要使用的数据放到一个对象中
            const success = result.items.map((item) => {
                return {avatarUrl:item.avatar_url,
                        name:item.login
                        }
            })
            console.log(response.data)
            this.setState({
                loading:false,
                success,
            })
        })
        .catch(err => {
            //得到错误信息
            this.setState({
                err:err.message
            })
        })
    }
    render(){
        const {init,loading,success,err} = this.state
        if(init){
            return (
                <h2>请输入关键字搜索</h2>
            )
        }
        else if(loading){
            return (
                <h2>正在loading...</h2>
            )
        }
        else if (success){
            return(
                <div className="ma">
                    {success.map((item,index) => {
                        return (
                        <div className="box" key={index}>
                            <img src={success.avatarUrl}></img>
                            <h2>{success.name}</h2>
                        </div>
                    )})}
                    
                    
                </div>
            )
        }
        else if(err){
            return (
                <h2>搜索失败</h2>
            )
        }
        
    }
}