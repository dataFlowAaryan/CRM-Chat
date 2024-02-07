const Agent = require("../models/agent.model");
const Agent = require("../models/agent.model");
const logger = require("../utils/logger");

const getSelf = async (req, res) => {
  try {
    const Agent = await Agent.findById(req.agent._id);

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found!",
      });
    }

    return res.status(200).json(agent);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const getAgentByID = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    return res.status(200).json({
      Agent,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAgentByQuery = async (req, res) => {
  try {
    const { email } = req.query;

    const agent = await Agent.findOne({
      email,
    });

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    return res.status(200).json(agent);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const agentController = {
  getAgentByID,
  getSelf,
  getAgentByQuery,
};

module.exports = agentController;
