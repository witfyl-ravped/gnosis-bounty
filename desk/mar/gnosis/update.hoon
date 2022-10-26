/-  *gnosis
=,  format
|_  upd=update
++  grab
  |%
  ++  noun  update
  --
++  grow
  |%
  ++  noun  upd
  ++  json
    ?-  -.upd
      %test-num
      ~&  >>>  "Sending update to frontend: {<upd>}"
      %-  pairs:enjs
      :~
        ['confirmation' (tape:enjs "Successful sub {<num.upd>}")]
      ==
    ==
  --
++  grad  %noun
--