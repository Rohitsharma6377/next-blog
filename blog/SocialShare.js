import React, { Component } from 'react'
// import { FacebookShareButton, FacebookMessengerShareButton, FacebookMessengerIcon, LinkedinShareButton, TwitterShareButton, PinterestShareButton, VKShareButton, OKShareButton, TelegramShareButton, WhatsappShareButton, RedditShareButton, EmailShareButton, TumblrShareButton, LivejournalShareButton, MailruShareButton, ViberShareButton, WorkplaceShareButton, LineShareButton, WeiboShareButton, PocketShareButton, InstapaperShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, PinterestIcon, VKIcon, OKIcon, TelegramIcon, WhatsappIcon, RedditIcon, TumblrIcon, MailruIcon, EmailIcon, LivejournalIcon, ViberIcon, WorkplaceIcon, LineIcon, PocketIcon, InstapaperIcon, WeiboIcon } from "react-share";

export class SocialShare extends Component {
    render() {
        const shareUrl = this.props.url
        const title = this.props.title
        const media = this.props.media
        return (
            <>
                <h3 className="heading"><span>Share the </span>Blog</h3>
                <div className="socialShare">
                    {/* <FacebookShareButton url={shareUrl} quote={title} > <FacebookIcon size={32} round /> </FacebookShareButton>
                    <FacebookMessengerShareButton url={shareUrl} appId="154761472308630"> <FacebookMessengerIcon size={32} round /></FacebookMessengerShareButton>
                    <TwitterShareButton url={shareUrl} title={title}><TwitterIcon size={32} round /></TwitterShareButton>
                    <TelegramShareButton url={shareUrl} title={title}><TelegramIcon size={32} round/></TelegramShareButton>
                    <WhatsappShareButton url={shareUrl} title={title} separator=":: "><WhatsappIcon size={32} round /></WhatsappShareButton>
                    <LinkedinShareButton url={shareUrl} ><LinkedinIcon size={32} round /></LinkedinShareButton>
                    <RedditShareButton url={shareUrl} title={title} windowWidth={660} windowHeight={460}><RedditIcon size={32} round/></RedditShareButton>
                    <TumblrShareButton url={shareUrl} title={title}><TumblrIcon size={32} round /></TumblrShareButton>
                    <LivejournalShareButton url={shareUrl} title={title} description={shareUrl}><LivejournalIcon size={32} round /></LivejournalShareButton>
                    <MailruShareButton url={shareUrl} title={title}><MailruIcon size={32} round /></MailruShareButton>
                    <EmailShareButton url={shareUrl} subject={title} body="body"><EmailIcon size={32} round /></EmailShareButton>
                    <ViberShareButton url={shareUrl} title={title}><ViberIcon size={32} round /></ViberShareButton>
                    <WorkplaceShareButton url={shareUrl} quote={title}><WorkplaceIcon size={32} round /></WorkplaceShareButton>
                    <LineShareButton url={shareUrl} title={title}><LineIcon size={32} round /></LineShareButton>
                    <PocketShareButton url={shareUrl} title={title}><PocketIcon size={32} round /></PocketShareButton>
                    <InstapaperShareButton url={shareUrl} title={title}><InstapaperIcon size={32} round /></InstapaperShareButton>
                    <PinterestShareButton url={shareUrl} media={media}><PinterestIcon size={32} round /></PinterestShareButton>
                    <VKShareButton url={shareUrl} image={media}><VKIcon size={32} round /></VKShareButton>
                    <OKShareButton url={shareUrl} image={media}><OKIcon size={32} round /></OKShareButton>
                    <WeiboShareButton url={shareUrl} title={title} image={media}><WeiboIcon size={32} round /></WeiboShareButton> */}
            </div>
        </>
        )
    }
}

export default SocialShare

{/* <PinterestShareButton url={String(window.location)} media={media}><PinterestIcon size={32} round /></PinterestShareButton> */}