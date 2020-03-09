<template>
    <div class="comment">
        <h2 class="submit-comment">发表评论</h2>
        <hr>
        <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120"  v-model="msg">
        </textarea>
        <div class="mui-btn mui-btn-primary" @click="postComments">
				发表评论
		</div>
        <div class="main-comment" v-for="(item,i) in comments" :key="item.add_time">
            <div class="person-comment">
                <h3 class="title-comment">第{{i+1}}楼 &nbsp;&nbsp; 用户:{{item.user_name}} &nbsp;&nbsp;发表时间:{{item.add_time | dataFormat}}</h3>
                <h4 class="content-comment">{{item.content === 'undefined' ? '此用户很懒，什么也没有留下':item.content}}</h4>
            </div>
        </div>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click="getMore">
				加载更多
		</button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageindex:1,
            comments:[],
            msg:''
        }
    },
    created(){
        this.getcomments();
    },
    methods:{
        getcomments(){
            this.$http.get('api/getcomments/'+ this.id +'?pageindex=' + this.pageindex).then(result=>{
                if(result.body.status === 0){
                    //Toast('评论获取ok！');
                    //this.comments = result.body.message
                    this.comments = this.comments.concat(result.body.message);
                }else{
                    Toast('评论获取失败！')
                }
            })
        },
        getMore(){
            this.pageindex++,
            this.getcomments()
        },
        postComments(){
            if(this.msg.trim().length === 0){
                Toast('评论不能为空！')
            }
            this.$http.post('api/postcomment/' + this.$route.params.id,{content:this.msg.trim()}).then(result=>{
                if(result.body.status === 0){
                    var cmt = {
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = ''
                }else{
                    Toast('请重新发表评论！');
                }
            })
        }
    },
    props:["id"]
}
</script>
<style lang="scss" scoped>
.comment{
    padding-bottom: 50px;
    .submit-comment{
        font-size:16px;
    }
    .mui-btn-primary{
        width:100%;
        font-size:16px;
    }
    textarea{
        margin:0;
        height: 80px
    }
    .person-comment{
        .title-comment{
            background-color: rgb(203,204,203);
            font-size: 14px;
        }
        .content-comment{
            font-size:12px;
            text-indent: 2em
        }
    }
    .mui-btn-danger{
        width: 100%;
        padding:10px;
        font-size:16px
    }
}
</style>
