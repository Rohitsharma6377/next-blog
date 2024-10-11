import Link from 'next/link'
import React, { Component } from 'react'

export class BlogBanner extends Component {
    render() {
        return (
            <>
                {this.props.blogs ?
                    <>
                        {this.props.blogs.slice(0, 1).map((i)=>{ 
                            let alt = i.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
                            return(
                                <div className="carousel-item active" key={i.id}>
                                    <img src={"/images/blog/"+ i.cover_img} alt={alt} className="web"/>
                                    <img src={"/images/blog/online-"+i.cover_img } alt={alt} className="mobile"/>
                                    <div className="carousel-caption">
                                        <Link href={"/" + i.url}><h2>{i.title}</h2></Link>
                                        <Link href={"/" + i.url} className="amitBtnInverse" style={{maxWidth:'150px'}}>Read More</Link>
                                    </div>
                                </div>
                            )})}
                        {this.props.blogs.slice(1, 3).map((i)=>{
                            let alt = i.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
                            return(
                                <div className="carousel-item" key={i.id}>
                                    <img src={"/images/blog/"+ i.cover_img} alt={alt} className="web"/>
                                    <img src={"/images/blog/online-"+i.cover_img } alt={alt} className="mobile"/>
                                    <div className="carousel-caption">
                                        <Link href={"/" + i.url}><h2>{i.title}</h2></Link>
                                        <Link href={"/" + i.url} className="amitBtnInverse" style={{maxWidth:'150px'}}>Read More</Link>
                                    </div>
                                </div>
                            )})}
                    </>
                : null }
            </>
        )
    }
}

export default BlogBanner