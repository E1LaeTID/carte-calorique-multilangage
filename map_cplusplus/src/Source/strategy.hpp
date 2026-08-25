#pragma once
#include <string>
#include <vector>
namespace mapcore {
struct Strategy { std::string objectRef; std::vector<std::string> actions; std::vector<bool> conditions; };
}
