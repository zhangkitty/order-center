#!/bin/bash

svn_dir=~/Desktop/order/trunk/order_dist
code_dir=~/WebstormProjects/order-center

cd $svn_dir/dist
svn update
svn delete ./* --force
svn commit -m 'delete'

cd $code_dir
\cp -rf ./dist $svn_dir

cd $svn_dir/dist
svn update
svn add ./*
svn commit -m 'update front code'

