import React, { Component } from 'react'
import Sidebar from './Sidebar'
import BlogCarousel from './BlogCarousel'
import SocialShare from './SocialShare'
import Comments from './Comments'
import Header from '../components/Header'
import Footer from '../components/Footer'

export class Single extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:               this.props.data,
            blogs:              this.props.blogs,
            blogList:           this.props.blogList,
            cats:               this.props.cats,
            tags:               this.props.tags,
            comments:           this.props.comments,
            response:           this.props.response,
            coverImg:          ''
        }
    }
    
    componentDidMount(){
        this.callApi()
    }
    
    callApi = async () => {
        const url = window.location.href.split("/").pop();
        const response = await fetch('/blog/single/'+url);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({
            data:           body.data,
            coverImg:       body.data.coverImg,
            blogs:          body.blogs,
            blogList:       body.blogList,
            cats:           body.cats,
            tags:           body.tags,
            comments:       body.comments,
            response:       body.response,
        })
    }

    render() {
        return (
            <> 
                { this.state.data ? 
                    <>
                    <div className="slider">
                    <img src={"/images/blog/"+this.state.data.coverImg} alt={this.state.data.coverImg.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')}/>
                        <div className="slider-caption">
                            <h1>{this.state.data.title}</h1>
                        </div>
                    </div>
                    <div className="page container py-5">
                        <h1 className="heading">{this.state.data.title} </h1>
                        <div className="row">
                            <div className="col-sm-9">
                                <section className="not-found-controller mb-5" dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
                                {/* <blockquote>Feel free to use images in our website by simply providing a source link to the page they are taken from. </blockquote> */}
                                {/* <SocialShare title={this.state.data.title} url={"http://www.amitkk.com/blog/"+this.state.data.url} media={"http://www.amitkk.com/amit/storage/app/public/blog/"+ this.state.data.coverImg}/> */}
                                <Comments comments={this.state.comments} response={this.state.response} blogId={this.state.data.id}/>
                            </div>
                            <Sidebar blogList={this.state.blogList} cats={this.state.cats} tags={this.state.tags}/>
                        </div>
                    </div>
                    {/* <BlogCarousel blogs={this.state.blogs}/> */}
                    </>
                : null }
            </>
        )
    }
}

export default Single