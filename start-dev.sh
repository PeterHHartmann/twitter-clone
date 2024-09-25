#!/bin/sh
if ! [ -n "$TMUX" ]; then
  tmux attach || tmux new-session \; \split-window -h 'cd backend && yarn dev' \; \split-window -h 'cd frontend && yarn dev';
else 
  tmux split-window -h 'cd backend && yarn dev';
  tmux split-window -h 'cd frontend && yarn dev';
fi
