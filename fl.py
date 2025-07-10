from flask import *
from werkzeug.wrappers.response import  *
from werkzeug.utils import *
import pymysql
import os
import time
from datetime import datetime
from waitress import serve
import markdown


app=Flask(__name__)
app.secret_key="xjp@8964"
app.config['UPLOAD_FOLDER'] = 'static/uploads'



@app.route('/index')
def index():
    return render_template('index.html')

@app.route("/register")
def student():
    return render_template("register.html")

@app.route('/login')
def login():
    return render_template('login.html')

@app.route("/boeing")
def boeing():
    return render_template("boeing.html")

@app.route("/china-planes")
def chinaplanes():
    return render_template("china-planes.html")

@app.route("/airport")
def airport():
    return render_template("airport.html")

@app.route("/airbus")
def airbus():
    return render_template("airbus.html")

@app.route("/bbs")
def bbs():
    return render_template("bbs.html")

@app.route("/osm")
def osm():
    return render_template("osm.html")

@app.route("/sms")
def sms():
    return render_template("sms.html")

@app.route("/post")
def post():
    if('username' in session):
        return render_template("post.html")
    return render_template("login.html")
    

@app.route("/api/post", methods=['POST'])
def get_post():
    #发文库
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    #身份库
    conn2=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor2=conn.cursor(cursor=pymysql.cursors.DictCursor)
    title=request.form.get('title')
    body=request.form.get('body')
    sql2="select id from userinformation where username=%s"
    cursor2.execute(sql2,[session['username']])
    author_id=cursor2.fetchall()[0]['id']
    sql="insert into bbs(title,author_id,timestamp,text) value(%s,%s,%s,%s)"
    cursor.execute(sql,[title,author_id,datetime.now().strftime('%Y-%m-%d %H:%M:%S'),body])
    conn.commit()
    cursor.close()
    conn.close()
    cursor2.close()
    conn2.close()
    return jsonify({'success': True})


@app.route("/user/<id>")
def user(id):
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    if('username' in session):
        sql="select id from userinformation where username=%s"
        cursor.execute(sql,[session['username']])
        #user_result=cursor.fetchall()[0]
        current_login_id=cursor.fetchall()[0]['id']
        if(int(current_login_id)==int(id)):
            cursor.close()
            conn.close()
            return redirect(url_for('personalinformation'))
    sql="select * from userinformation where id=%s"
    cursor.execute(sql,[id])
    user_result=cursor.fetchall()
    if(not user_result):
        cursor.close()
        conn.close()
        return "该作者已死亡，其所有信息已被清空"
    data_list=user_result[0]
    cursor.close()
    conn.close()
    return render_template("user.html",**data_list)

@app.route('/article')
def article():
    article_id = request.args.get('id')  # 这是关键点
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    conn2=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor2=conn.cursor(cursor=pymysql.cursors.DictCursor)
    sql="select * from bbs where id=%s"
    cursor.execute(sql,[article_id])
    data_list=cursor.fetchall()[0]
    sql2="select pic_url,name from userinformation where id=%s"
    cursor2.execute(sql2,[data_list['author_id']])
    user_result=cursor2.fetchall()
    if(not user_result):
        data_list2={"pic_url":"uploads/dead.jpeg","name":"作者已死亡"}
    else:
        data_list2=user_result[0]
    cursor2.close()
    conn2.close()
    cursor.close()
    conn.close()
    data_list['text']=markdown.markdown(data_list['text'])
    return render_template('article.html',**data_list,**data_list2)


@app.route("/api/posts")
def get_posts():
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    sql="select * from bbs"
    cursor.execute(sql)
    posts=[]
    for data_list in cursor.fetchall():
        conn2=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
        cursor2=conn.cursor(cursor=pymysql.cursors.DictCursor)
        sql2="select pic_url,name from userinformation where id=%s"
        cursor2.execute(sql2,[data_list['author_id']])
        user_result = cursor2.fetchall()
        cursor2.close()
        conn2.close()
        if(not user_result):
            posts.append({"id":data_list['id'],
                        "title":data_list['title'],
                        "author":"作者已死亡",
                        "avatar":"static/uploads/dead.jpeg",
                        "timestamp":data_list['timestamp'],
                        "top":bool(data_list['top']),
                        "user_id":data_list['author_id']})
        else:
            pun=user_result[0]
            posts.append({"id":data_list['id'],
                        "title":data_list['title'],
                        "author":pun['name'],
                        "avatar":url_for('static', filename=pun['pic_url']),
                        "timestamp":data_list['timestamp'],
                        "top":bool(data_list['top']),
                        "user_id":data_list['author_id']})
                       
    
    cursor.close()
    conn.close()
    return jsonify(posts)  # 返回 JSON 数据




@app.route("/personal-information")
def personalinformation():
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    if('username' in session):
        username=session['username']
        sql="select * from userinformation where username=%s"
        cursor.execute(sql,[username])
        data_list=cursor.fetchall()[0]
        #for key, value in data_list.items():
        #    print(f"{key} = {value}")
        cursor.close()
        conn.close()
        return render_template("/personal information.html",**data_list)
    cursor.close()
    conn.close()
    return redirect(url_for("login"))

@app.route("/upload_photo", methods=['POST'])
def upload_photo():
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    file = request.files.get('photo')
    username = session.get('username')  # 假设你用 session 登录了

    if not file or not username:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'message': '图片或用户缺失'})

    # 生成安全文件名
    sql="select id from userinformation where username=%s"
    cursor.execute(sql,[username])
    data_list=cursor.fetchall()
    filename=f"{int(time.time())}_{data_list[0]['id']}_{secure_filename(file.filename)}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # 存入数据库（只存相对路径）
    relative_path = f'uploads/{filename}'
    cursor.execute("UPDATE userinformation SET pic_url = %s WHERE username = %s", (relative_path, username))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'success': True, 'path': relative_path})

@app.route("/edit_info", methods=['POST'])
def edit_info():
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    username=session['username']
    ALLOWED_FIELDS = {'name', 'sex', 'birth', 'city', 'com_ap', 'fav_aero', 'fav_ap'}

    for column, value in request.form.items():
        if column in ALLOWED_FIELDS:
            if(column=="birth" and value=="NULL"):
                cursor.execute("UPDATE userinformation SET birth=null WHERE username = %s",(username))
                conn.commit()
            else:
                sql = f"UPDATE userinformation SET {column} = %s WHERE username = %s"
                cursor.execute(sql, (value, username))
                conn.commit()
        else:
            cursor.close()
            conn.close()
            return jsonify({'success': False,'message': '我操死你的妈你再敢sql注入一个试试呢？'})
    cursor.close()
    conn.close()
    return jsonify({'success': True})
    



@app.route('/logout')
def logout():
    session.pop('username',None)
    return redirect(url_for("login"))

@app.route('/drop_user', methods=['POST'])
def drop_user():
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    confirm = request.form.get('confirm')  # 用 request.form 获取
    username=session['username']
    #print(username)
    sql="DELETE FROM userinformation WHERE username = %s;"
    cursor.execute(sql,[username])
    session.pop('username',None)
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'success': True})

@app.route('/receive_data_reg', methods=['POST'])
def receive_data_reg():
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    username = request.form.get('username')  # 用 request.form 获取
    password = request.form.get('password')
    sql="select * from userinformation where username=%s"
    cursor.execute(sql,[username])
    data_list=cursor.fetchall()
    cursor.close()
    conn.close()
    if(not data_list):#找不到用户数据
        return jsonify({'success': False,'message': '用户名或密码错误'})
    elif(data_list[0]["password"]!=password):#找到但密码错误
        return jsonify({'success': False,'message': '用户名或密码错误'})
    session['username']=username
    return jsonify({'success': True})


@app.route('/receive_data', methods=['POST'])
def receive_data():
    conn=pymysql.connect(host="127.0.0.1",port=3306,user='root',passwd="Qzfw114514+",charset="utf8",db="aerowiki")
    cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
    username = request.form.get('username')  # 用 request.form 获取
    password = request.form.get('password')
    sql="SELECT COUNT(*) FROM userinformation WHERE username = %s;"
    cursor.execute(sql,[username])
    data_list=cursor.fetchall()
    if(data_list[0]['COUNT(*)']==0):
        cursor.execute("insert userinformation(username,password) values(%s,%s);",[username,password])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True})
    else:
        cursor.close()
        conn.close()
        return jsonify({'success': False,'message': '用户名已存在'})


if __name__=="__main__":
    serve(app, host="0.0.0.0", port=5000,threads=16)
    #app.run(threaded=True)
