export const uploadVideo = async (req, res) => {
  // console.log(req.body, req.file);

  const optionsToCreateVideo = {
    method: "POST",
    url: `http://video.bunnycdn.com/library/${settings.VIDEO_LIBRARY_ID}/videos`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      AccessKey: settings.BUNNY_API_KEY,
    },
    data: JSON.stringify({ title: req.body.name }),
  };

  await axios
    .request(optionsToCreateVideo)
    .then((response) => {
      const video_id = response.data.guid;

      axios
        .put(
          `http://video.bunnycdn.com/library/${settings.VIDEO_LIBRARY_ID}/videos/${video_id}`,
          {
            headers: {
              AccessKey: settings.BUNNY_API_KEY,
            },
            body: req.file ,
          }
        )
        .then(function (response) {
          res.status(200).json(response);
        })
        .catch(function (error) {
          // console.error("error", error);
          res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(200).json({ error: "failed!" });
    });
};
