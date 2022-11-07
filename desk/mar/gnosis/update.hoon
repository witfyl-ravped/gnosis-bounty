/-  *gnosis
=,  enjs:format
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
    %address-book
      :: ~&  >>>  +<-.upd
      :: ~&  >>  address-book.upd
      :: [+<-.upd (tape "address book here")]
      (parse-address-book address-book.upd)
    %added-safes
      (parse-added-safes safes.upd)
    %test-num
      %-  pairs
      :~
        ['confirmation' (tape "Successful sub {<num.upd>}")]
      ==
    ==
  ++  parse-added-safes
    |=  =safes
    =-  'addedSafes'^o/-
    %-  ~(run by safes)
    |=  safe=(map @t [@ud @t (list @t)])
    :-  %o
    %-  ~(run by safe)
    |=  [t=@ud e=@t o=(list @t)]
    %-  pairs
    :~  'ethBalance'^s/e
        'threshold'^(numb t)
        'owners'^a/(turn o :(corl (cury frond %value) ^json (lead %s)))
    ==
  ++  parse-address-book
    |=  book=address-book
    %-  frond
    =-  address-book+o/-
    %-  ~(run by book)
    |=(buk=(map @t @t) o/(~(run by buk) (lead %s))) 
  --
++  grad  %noun
--