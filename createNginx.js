/**
 * Created by mac on 2017/6/29.
 */
const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');

const log = console.log;
const staticFilePath = __dirname;

const args = process.argv.splice(2);
const propxyPath = args[0];
const port = args[1] || 8888;

const str = `
worker_processes  2;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
pid        ${staticFilePath}/nginx/nginx.pid;

events {
    worker_connections  256;
}
http {
    #静态资源地址#
    geo $STATIC_PATH {
        default ${staticFilePath};
    }
    # 设定负载均衡后台服务器列表
    upstream  backend  {
      #ip_hash;
      server ${propxyPath};
    }
    #后台代理服务器地址#
    geo $PROXY_SERVER_PATH {
        default ${propxyPath};
    }
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  $STATIC_PATH/nginx/logs/access.log main;
    sendfile        on;
    # tcp_nopush     on;
    keepalive_timeout  65;
  # gzip压缩功能设置
    gzip on;
  #  gzip_min_length 1k;
  #  gzip_buffers    4 16k;
  #  gzip_http_version 1.0;
  #  gzip_comp_level 6;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
  #  gzip_vary on;
  
  # http_proxy 设置
    client_max_body_size   10m;
    client_body_buffer_size   128k;
    proxy_connect_timeout   75;
    proxy_send_timeout   75;
    proxy_read_timeout   75;
    proxy_buffer_size   4k;
    proxy_buffers   4 32k;
    proxy_busy_buffers_size   64k;
    #proxy_temp_file_write_size  64k;
    #proxy_temp_path   /usr/local/nginx/proxy_temp 1 2;

  # 很重要的虚拟主机配置
    server {
        listen       ${port}; #####################端口号##################
        server_name  localhost;
        root   $STATIC_PATH;
        charset utf-8;
       #  access_log  logs/host.access.log  main;
        #对 / 所有做负载均衡+反向代理
        location / {
            root  $STATIC_PATH;
            index  index.jsp index.html index.htm;
            proxy_pass        http://backend;
            proxy_redirect off;
            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header  Host  $PROXY_SERVER_PATH;
            proxy_set_header  X-Real-IP  $remote_addr;  
            proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
            
        }
        #静态文件，nginx自己处理，不去backend请求tomcat
        location  = / {
            root $STATIC_PATH;

        }
        location ~ .*\.(html|gif|jpg|jpeg|bmp|png|ico|txt|js|css)$
        {
            root $STATIC_PATH;
        }
       # location /nginx_status {
        #    stub_status on;
         #   access_log off;
          #  allow 192.168.10.0/24;
           # deny all;
        #}
        location ~ ^/(WEB-INF)/ {   
            deny all;   
        }
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

  ## 其它虚拟主机，server 指令开始
}`;

fs.writeFile('nginx/nginx.conf', str,  function(err) {
  if (err) {
    return console.error(err);
  }
  return log("nginx.conf 创建成功");
});



const startCmd = `nginx -c ${staticFilePath}/nginx/nginx.conf`;
const reloadCmd = `nginx -c ${staticFilePath}/nginx/nginx.conf -s reload`;

exec(startCmd, function(error, stdout, stderr) {
  if (stderr) {
    if (stderr.indexOf('already in use') > -1){
      log(chalk.yellow('nginx 正在重启, 请稍等...'));
      return exec(reloadCmd, function (error2, stdout2, stderr2) {
        if (stderr2) {
          return console.error(stderr2);
        }
        return log(chalk.magenta('====== nginx已启动 ======='));
      });
    }
  }
  console.error(error)
  return log(chalk.magenta('====== nginx 启动成功 ！======'));
});
