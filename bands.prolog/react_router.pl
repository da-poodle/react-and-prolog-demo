:- module(react_router, [route/1]).

:- use_module(library(pcre)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).

% The default hanlder for static files, there may be more
% handlers in other modules/files.
:- http_handler(root(.), http_reply_from_files('htdocs', []), [prefix]).

% the regex defines how we load. Basically if we request anything in
% the api or static folders or the favicon then use a http_dispatch
% router. If anything else then send back the index page and let react
% handle it.
route(Request) :-
      memberchk(path(P), Request),
      re_match("^\\/((api\\/|static\\/).*|favicon.ico)$"/i, P),
      http_dispatch(Request),
      !. % cut here as we have found our target.

% we can't find any relevant route so send back the index page and let
% react sort it out.
route(Request) :-
      http_reply_file('htdocs/index.html', [], Request).






