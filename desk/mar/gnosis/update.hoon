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
    %owned-safes
      (parse-owned-safes owned-safes.upd)
    %test-num
      %-  pairs
      :~
        ['confirmation' (tape "Successful sub {<num.upd>}")]
      ==
    ==
  ++  parse-added-safes
    |=  =safes
    =-  (frond 'addedSafes'^o/-)
    %-  ~(run by safes)
    |=  safe=(map @t [@ud @t (list @t)])
    :-  %o
    %-  ~(run by safe)
    |=  [thresh=@ud ethebal=@t owners=(list @t)]
    %-  pairs
    :~  'ethBalance'^s/ethebal
        'threshold'^(numb thresh)
        'owners'^a/(turn owners :(corl (cury frond %value) ^json (lead %s)))
    ==  
  ::
  ++  parse-address-book
    |=  book=address-book
    =-  (frond address-book+o/-)
    %-  ~(run by book)
    |=(buk=(map @t @t) o/(~(run by buk) (lead %s))) 
  ::
  ++  parse-owned-safes
    |=  =owned-safes
    =-  (frond 'ownedSafes'^o/-)
    %-  ~(run by owned-safes)
    |=  owned=(map @t (list @t))
    :-  %o
    %-  ~(run by owned)
    |=  [safs=(list address=@t)]
    a/(turn safs :(corl ^json (lead %s)))
  --
++  grad  %noun
--