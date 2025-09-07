# Number of commits per day
COMMITS_PER_DAY=5

# Loop over past 5 days
for day_offset in {5..1}; do
  # Calculate the date for this day
  DATE=$(date -d "-$day_offset day" +"%Y-%m-%d")
  
  # Make 5 commits for this date
  for commit_num in $(seq 1 $COMMITS_PER_DAY); do
    # Generate a random hour (0-23), minute (0-59), second (0-59)
    HOUR=$(shuf -i 0-23 -n 1)
    MINUTE=$(shuf -i 0-59 -n 1)
    SECOND=$(shuf -i 0-59 -n 1)
    
    RANDOM_TIME=$(printf "%02d:%02d:%02d" $HOUR $MINUTE $SECOND)
    
    GIT_AUTHOR_DATE="$DATE $RANDOM_TIME" \
    GIT_COMMITTER_DATE="$DATE $RANDOM_TIME" \
    git commit --allow-empty -m "Commit $commit_num for $DATE at $RANDOM_TIME"
  done
done