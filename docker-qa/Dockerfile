FROM repo.int.tsum.com:443/nodejs18:prod

WORKDIR /

ADD bootstrap.sh /bootstrap.sh
RUN chmod +x /bootstrap.sh

EXPOSE 3000

#CMD ["/bin/sh"]
CMD ["/bin/sh", "bootstrap.sh"]